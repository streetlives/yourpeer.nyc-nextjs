export default async function MapDetail({
  params: { slug },
}: {
  params: { slug: string },
}) {
  return <div>
    Hello {slug}
  </div>
}

