import Document, { Html, Head, Main, NextScript } from 'next/document'
import Nav from "../components/Navbar"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                <Nav/>
                <br/>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument