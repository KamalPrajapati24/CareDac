import React from "react";
import { Avatar, Box, Card, CardContent, Paper, Typography } from "@mui/material";
import person1 from "../../images/p1.png";
import person2 from "../../images/p2.png";
import person3 from "../../images/p3.png";

const transactions = [
  {
    name: "Juliya",
    date: "Oct 29, 2023 7:38 am",
    amount: "$3,165.98",
    img: person1,
  },
  {
    name: "Jack",
    date: "Oct 13, 2023 10:36 am",
    amount: "$1,491.47",
    img: person2,
  },
  {
    name: "DJ",
    date: "Oct 12, 2023 10:24 pm",
    amount: "$9,621.63",
    img: person3,
  },
];

const PaymentHistory = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      {transactions.map((transaction, index) => (
    <Paper key={index} sx={{ p: 2 , shadow:3 }}>
        <Card key={index} sx={{ mb: 2, p: 2, display: "flex", alignItems: "center", borderRadius: 2 }}>
          <Avatar src={transaction.img} sx={{  width: "64px",
                          height: "64px",
                          borderRadius: "12px",
                          border: "3px solid rgb(252, 145, 85)",}} />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {transaction.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {transaction.date}
            </Typography>
          </CardContent>
           <Paper elevation={3} sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: "#ffffff", minWidth: 100, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            {transaction.amount}
          </Typography>
           </Paper>
        </Card>
      </Paper>
      ))}
    </Box>
  );
};

export default PaymentHistory;
