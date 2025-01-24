"use server"

export default async function getAbout() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/about?populate%5B0%5D=heroContent,images,expertises.counter,story.storyCard,testimonials.logo,%20testimonials.avatar,cta.image,cta.document,metas.shareImage,steps`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();
    return JSON.parse(JSON.stringify(data.data.attributes));
}