import React from "react";
import prisma from "@/prisma/db";
import DashRecentTickets from "@/components/DashRecentTickets";
import DashChartCount from "@/components/DashChartCount";
import DashChartUser from "@/components/DashChartUser";
import DashPieChartPriority from "@/components/DashPieChartPriority";

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  const assignedTickets = await prisma.ticket.groupBy({
    by: ["assignedToUserId"],
    _count: {
      id: true,
    },
  });

  const userIds = assignedTickets
    .map((item) => item.assignedToUserId)
    .filter((id) => id !== null) as number[];

  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const data2 = assignedTickets.map((item) => {
    const user = users.find((user) => user.id === item.assignedToUserId);
    return {
      name: user?.name || "Unknown",
      total: item._count.id,
    };
  });

  const priorityTickets = await prisma.ticket.groupBy({
    by: ["priority"],
    _count: {
      id: true,
    },
  });

  const data3 = priorityTickets.map((item) => {
    return {
      name: item.priority,
      value: item._count.id,
    };
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChartCount data={data} />
        </div>
        <div>
          <DashChartUser data={data2} />
        </div>
        <div>
          <DashPieChartPriority data={data3} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
