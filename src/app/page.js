import Link from "next/link";
import "./globals.css";
import "./page.css";

export default function Home() {
  return (
    <div className="home">
      <nav>
        <h1 className="Appname">VERCEL AI</h1>
        <ul>
          <li>
            <Link href="/generate_text" onclick="location.reload()">
              GENERATE TEXT
            </Link>
          </li>
          <li>
            <Link href="/stream_text">STREAM TEXT</Link>
          </li>
          <li>
            <Link href="/generate_object">GENERATE OBJECT</Link>
          </li>
          <li>
            <Link href="/stream_object">STREAM OBJECT</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
