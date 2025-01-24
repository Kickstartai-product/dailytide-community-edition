export default async function sitemap() {
  // you can retrieve data and append it to the sitemap
  // for example get the posts and append it to the routes like  [...routes, ...posts]

  const routes = [''].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
