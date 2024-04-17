import { useEffect, useState } from "react";
import { useTransactionDetails } from "../../hook/transaction.hooks";
import { getValue } from "../../utils/object";
import DataTable from "react-data-table-component";
import { transactionColumn } from "../../components/table/TransactionTable";
import { customStyles } from "../../components/styles/DefaultStyles";

const Home = () => {
  const { mutateAsync } = useTransactionDetails();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactionDetails = async () => {
    const response = await mutateAsync();
    const transactionList = getValue(response, "data", []);
    setTransactions(transactionList);
  };

  useEffect(() => {
    fetchTransactionDetails(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-black px-10">
      <div className="py-10 font-extrabold">Transaction Details</div>
      <div className="border-[0.5px]">
        <DataTable
          columns={transactionColumn}
          data={transactions}
          pointerOnHover
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="387px"
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        />
      </div>
    </div>
  );
};

export default Home;
