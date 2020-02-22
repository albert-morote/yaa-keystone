import Document, { Html, Head, Main, NextScript } from 'next/document'
import Nav from "../components/Nav"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
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