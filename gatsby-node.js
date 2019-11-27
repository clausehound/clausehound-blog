const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

async function getPosts({ graphql }) {
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 50
        ) {
          edges {
            node {
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

exports.createPages = async ({ graphql, actions }) =>
  Promise.all([
    getPosts({ graphql }).then(posts =>
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
    ),
    getAuthors({ graphql }).then(authors =>
      authors.map(({ node }) => ({
        path: node.id,
        component: authorBio,
        context: {
          slug: node.id,
        },
      })),
    ),
  ]).then(([posts, authors]) => {
    // TODO: Check here if we have a slug collision and rename appropriately
    // TODO: flatten
    posts.concat(authors).forEach(page => {
      console.log(page);
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
