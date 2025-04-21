import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
function MyDocument(props) {
    return (
        <>
        <Document className="p-3">
            <Page size="A4">
                <View>
                    <Text>{props.content}</Text>
                </View>
            </Page>
        </Document>
        </>
    )
}
export default MyDocument;