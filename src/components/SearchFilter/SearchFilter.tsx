import CustomTextField from "../Inputfield/CustomTextField";
import "../../styles/SearchFilter/SearchFilter.css";
interface SearchFilterInterface {
  labelObj: {
    label1: string;
    label2: string;
    label3: string;
  };
  value1: string;
  value2: string;
  value3: string;
  onChange1: (value: string) => void;
  onChange2: (value: string) => void;
  onChange3: (value: string) => void;
  popup: any;
}
const SearchFilter = ({
  labelObj,
  value1,
  value2,
  value3,
  onChange1,
  onChange2,
  onChange3,
  popup,
}: SearchFilterInterface) => {
  return (
    <>
      <div className="search-filter-combo" ref={popup}>
        <CustomTextField
          label={labelObj.label1}
          value={value1}
          onChange={(e) => onChange1(e.target.value)}
        />
        <CustomTextField
          label={labelObj.label2}
          value={value2}
          onChange={(e) => onChange2(e.target.value)}
        />
        <CustomTextField
          label={labelObj.label3}
          value={value3}
          onChange={(e) => onChange3(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchFilter;
