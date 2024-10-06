import "../styles/App.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
      </head>
      <body>
        <div className="App">
          {children}
        </div>
      </body>
    </html>
  )
}