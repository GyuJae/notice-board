import Head from 'next/head'

interface ILayout {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
  return (
    <main className="mx-auto max-w-3xl">
      <Head>
        <title>{title} | Notice</title>
      </Head>
      <div className="w-full">{children}</div>
    </main>
  )
}

export default Layout
