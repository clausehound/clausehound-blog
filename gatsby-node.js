require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});
const path = require(`path`);
const slugify = require(`slugify`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { authors: filterAuthors } = require(`./src/utils/filters.ts`);

async function getPosts({ graphql }) {
  const result = await graphql(
    `
      {
        allPosts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 65535
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                author {
                  id
                  first
                  last
                }
              }
            }
          }
        }
        allTags: allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // get blog posts pages.
  return {
    posts: result.data.allPosts.edges,
    tags: result.data.allTags.group,
  };
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
const tagList = path.resolve(`./src/templates/tag-list.ts`);

const postsPerPage = 0xff;

const listPath = i => {
  if (i < 0) return null;
  if (i === 0) return "/";
  return `/page/${i + 1}`;
};

exports.createPages = async ({ graphql, actions }) =>
  Promise.all([
    getPosts({ graphql }).then(({ posts, tags }) => {
      const numPages = Math.ceil(posts.length / postsPerPage);

      return [
        // Make all the full blog entry pages
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
        // Build all the paginated main pages
        Array.from({ length: numPages }, (_, i) => ({
          path: listPath(i),
          component: blogList,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            previousPath: listPath(i - 1),
            nextPath: listPath(i + 1),
          },
        })),
        tags.filter(({ tag }) => !filterAuthors.has(tag)).map(({ tag }) => ({
          path: `/tags/${slugify(tag)}`,
          component: tagList,
          context: {
            tag,
          },
        })),
      ];
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
  ]).then(([[posts, lists, tags], authors]) => {
    // TODO: Check here if we have a slug collision and rename appropriately
    [...posts, ...lists, ...tags, ...authors].forEach(page => {
      actions.createPage(page);
    });
  });

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
