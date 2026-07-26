import { Route, Routes } from "react-router";
import { TopPage } from "@/pages/top";
import { VariantPage } from "@/pages/variant";

export function App() {
  return (
    <main className="wrap">
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/:slug" element={<VariantPage />} />
      </Routes>
    </main>
  );
}
