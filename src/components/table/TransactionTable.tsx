import { TableColumn } from "react-data-table-component";

interface Transaction {
  "Receiver Full Name": string;
  "Receive Country": string;
  "Send Country": string;
  "Send Amount": string;
  "Sender Full Name": string;
}

export const transactionColumn: TableColumn<Transaction>[] = [
  {
    name: "Sender Name",
    selector: (row: Transaction) => row["Sender Full Name"],
    cell: undefined,
  },
  {
    name: "Receiver Name",
    selector: (row: Transaction) => row["Receiver Full Name"],
    cell: undefined,
  },
  {
    name: "Receiver Country",
    selector: (row: Transaction) => row["Receive Country"],
    cell: undefined,
  },
  {
    name: "Send Country",
    selector: (row: Transaction) => row["Send Country"],
    cell: undefined,
  },

  {
    name: "Amount",
    selector: (row: Transaction) => row["Send Amount"],
    cell: undefined,
  },
];
