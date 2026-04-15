'use client'
import Layout from "@/components/layout/Layout"
import data from "@/util/blog.json"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BlogDetails() {
    let Router = useParams()
    const [blogPost, setBlogPost] = useState(null)
    const id = Router.id

    useEffect(() => {
        setBlogPost(data.find((data) => data.id == id))
    }, [id])

    return (
        <>
            <Layout footerStyle={2}>
                {blogPost && (
                    <>
                        {blogPost.title}
                    </>
                )}
            </Layout>
        </>
    )
}