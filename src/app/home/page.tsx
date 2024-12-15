import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Button 
                className="hover:bg-red-500 transition-colors"
            >
                Click Me
            </Button>
        </main>
    )
}