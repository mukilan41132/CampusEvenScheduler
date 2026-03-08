import "../../styles/NORecordFound/NoData.css";
interface NoData {
  message: string;
}
const NoData = ({ message }: NoData) => {
  return (
    <>
      <section className="section-noRecords">{message}</section>
    </>
  );
};

export default NoData;
