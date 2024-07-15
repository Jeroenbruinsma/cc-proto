import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table/Table";


const SitesPage: FunctionComponent = () => {
  const navigate = useNavigate()
  return (
    <>
      <TopHeader showImage={true} />
      <Table/>
      <ul>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0001')}`)}>1902121-14165-0/0001</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0006')}`)}>1902121-14165-0/0006</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0002')}`)}>1902121-14165-0/0002</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0003')}`)}>1902121-14165-0/0003</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0004')}`)}>1902121-14165-0/0004</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0005')}`)}>1902121-14165-0/0005</li>
      </ul>
    </>
  );
};

export default SitesPage;
