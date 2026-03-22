// type ErrorMessageProps = {
//   message: string;
// };

export default function ErrorMessage({ message }: any) {
 
  if (!message) return null;

  return <div style={styles.error}>{message}</div>;
}

const styles = {
  error: {
    color: "red",
    backgroundColor: "#ffe6e6",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "10px",
    fontSize: "14px",
  },
};
