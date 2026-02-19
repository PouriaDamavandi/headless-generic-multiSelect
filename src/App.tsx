import { MultiSelect } from "@/components/ui/molecules/multi-select/multi-select";
import { useState } from "react";
import { users, type User } from "@/lib/users";

export default function App() {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Headless MultiSelect
      </h1>

      <MultiSelect<User>
        items={users}
        value={selected}
        onChange={setSelected}
        identifier="id"
        searchBy={["name", "email"]}
        min={0}
        max={3}
      />
    </div>
  );
}
