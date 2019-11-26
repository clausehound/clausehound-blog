const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

async function getPosts({ graphql }) {
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 65535
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
                author {
                  id
                  first
                  last
                }
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // get blog posts pages.
  return result.data.allMarkdownRemark.edges;
}

async function getAuthors({ graphql }) {
  const result = await graphql(
    `
      {
        allAuthorJson {
          edges {
            node {
              id
              first
              last
              bio
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // get blog posts pages.
  return result.data.allAuthorJson.edges;
}

const blogPost = path.resolve(`./src/templates/blog-post.ts`);
const authorBio = path.resolve(`./src/templates/author-bio.ts`);
const blogList = path.resolve(`./src/templates/blog-list.ts`);

const postsPerPage = 0xff;

const listPath = (i, subdir) => {
  const base = subdir === 'blog' ? '' : `/${subdir}`
  if (i < 0) return null;
  if (i === 0) return `${base}/`;
  return `${base}/page/${i + 1}`;
};

const getSubdir = path => path.split("/").slice(-3)[0];

exports.createPages = async ({ graphql, actions }) => {
  Promise.all([
    getPosts({ graphql }).then(allPosts => {
      // organize by subdir
      const subdirs = allPosts.reduce(
        (a, post) =>
          a.set(
            getSubdir(post.node.fileAbsolutePath),
            (a.get(getSubdir(post.node.fileAbsolutePath)) || []).concat(post),
          ),
        new Map(),
      );

      // Make all the full blog entry pages
      return Array.from(subdirs)
        .map(x => {
          const [subdir, posts] = x;
          const numPages = Math.ceil(posts.length / postsPerPage);

          return [
            // Make all the full blog entry pages for this subdir
            posts.map((post, index) => {
              const previous =
                index === posts.length - 1 ? null : posts[index + 1].node;
              const next = index === 0 ? null : posts[index - 1].node;
              return {
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                  slug: post.node.fields.slug,
                  previous,
                  next,
                },
              };
            }),
            // Build all the paginated main pages for this subdir
            Array.from({ length: numPages }, (_, i) => ({
              path: listPath(i, subdir),
              component: blogList,
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                subdir,
                numPages,
                currentPage: i + 1,
                previousPath: listPath(i - 1, subdir),
                nextPath: listPath(i + 1, subdir),
              },
            })),
          ];
        })
        .reduce(
          ([aPosts, aLists], [posts, lists]) => [
            aPosts.concat(posts),
            aLists.concat(lists),
          ],
          [[], []],
        );
    }),
    getAuthors({ graphql }).then(authors =>
      authors.map(({ node }) => ({
        path: node.id,
        component: authorBio,
        context: {
          slug: node.id,
        },
      })),
    ),
  ]).then(([[posts, lists], authors]) => {
    // TODO: Check here if we have a slug collision and rename appropriately
    [...posts, ...lists, ...authors].forEach(page => actions.createPage(page));
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const subdir = getNode(node.parent).sourceInstanceName;
    const value = createFilePath({ node, getNode });
    const slug = subdir === "blog" ? value : `/${subdir}${value}`;

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
    createNodeField({
      name: `subdir`,
      node,
      value: subdir,
    });
  }
};
