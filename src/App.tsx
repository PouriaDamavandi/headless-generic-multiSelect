import { UserMultiSelect } from "@/components/ui/molecules/multiSelect";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@test.com`,
}));

export default function App() {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Headless MultiSelect
      </h1>

      <UserMultiSelect users={users} value={selected} onChange={setSelected} />
    </div>
  );
}
