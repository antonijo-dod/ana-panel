import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
    component: Contact,
})

export default function Contact() {
    return (
        <div>Contact page content</div>
    )
}