import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from '@mantine/next';
const getInitialProps = createGetInitialProps();
export default class MyDocument extends Document {
    static getInitialProps = getInitialProps;
    render () {
        return (
            <Html lang="en">
                <Head>
                    <base href={ process.env.PUBLIC_URL } />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700%7CPoppins:300,400,500,600,700" />
                    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/fonts-molla.min.css" />
                    <link rel="stylesheet" type="text/css" href="vendor/line-awesome/css/line-awesome.min.css" />
                </Head>
                <body>
                    <Main />
                    <script src="js/jquery.min.js"></script>
                    <NextScript />
                </body>
            </Html>
        )
    }
}