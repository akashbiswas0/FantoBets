import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi"; // Import useAccount to check connection status
import { useRouter, usePathname } from "next/navigation"; // Import usePathname to get the current route
import { useEffect } from "react";

export default function Navbar() {
    const { isConnected } = useAccount(); // Check if wallet is connected
    const router = useRouter(); // Initialize Next.js router for navigation
    const pathname = usePathname(); // Get the current path

    // Redirect only if the user is on the landing page and connected
    useEffect(() => {
        if (isConnected && pathname === "/") {
            router.push("/availablegames"); // Redirect to the desired page
        }
    }, [isConnected, router, pathname]); // Run effect when connection status or pathname changes

    return (
        <div>
            <header className="bg-neutral-800 py-4 px-6 flex justify-between items-center rounded-sm">
                <Link href="/">
                    <h1 className="text-4xl font-extrabold font-body text-pink-700 ml-8">
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
