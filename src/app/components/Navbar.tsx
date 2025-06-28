import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b-2 border-black px-4 py-3 mx-4 mt-4 rounded-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
          BitLuck
        </Link>
        
        <div className="flex space-x-6">
          <Link href="/" className="text-black hover:text-gray-700 transition-colors font-medium">
            Home
          </Link>
          <Link href="/how-it-works" className="text-black hover:text-gray-700 transition-colors font-medium">
            How It Works
          </Link>
          <Link href="/docs" className="text-black hover:text-gray-700 transition-colors font-medium">
            Docs
          </Link>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}
