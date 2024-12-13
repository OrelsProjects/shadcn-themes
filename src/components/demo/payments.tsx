"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";

const payments = [
  { status: "Success", email: "ken99@yahoo.com", amount: "$316.00" },
  { status: "Success", email: "abe45@gmail.com", amount: "$242.00" },
  { status: "Processing", email: "monserrat44@gmail.com", amount: "$837.00" },
  { status: "Failed", email: "carmella@hotmail.com", amount: "$721.00" },
];

interface PaymentsProps {
  theme: ThemePalette;
}

export function Payments({ theme }: PaymentsProps) {
  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
