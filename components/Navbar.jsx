import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi"; // Import useAccount to check connection status
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useEffect } from "react";

export default function Navbar() {
    const { isConnected } = useAccount(); // Check if wallet is connected
    const router = useRouter(); // Initialize Next.js router for navigation

    // Redirect to another page if the user is connected
    useEffect(() => {
        if (isConnected) {
            router.push("/availablegames"); // Redirect to the desired page
        }
    }, [isConnected, router]); // Run effect when connection status changes

    return (
        <div>
            <header className="bg-neutral-300 py-4 px-6 flex justify-between items-center rounded-sm">
                <Link href="/">
                    <h1 className="text-4xl font-extrabold font-body text-pink-700">
                        FantoBet
                    </h1>
                </Link>
                <div className="flex space-x-2">
                    <ConnectButton />
                </div>
            </header>
        </div>
    );
}
