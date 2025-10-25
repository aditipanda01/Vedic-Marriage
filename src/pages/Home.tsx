import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white gap-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Vedic Marriage</h1>
      <p className="text-xl text-center text-muted-foreground">Find your perfect match</p>
      <Link to="/signup">
        <Button className="w-48 h-12 text-lg">Get Started</Button>
      </Link>
    </div>
  )
} 