import { Route, Routes } from "react-router";
import { TopPage } from "@/pages/top";
import { VariantPage } from "@/pages/variant";
import { CurrentApiPage } from "@/pages/current-api";

export function App() {
  return (
    <main className="wrap">
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/current-api" element={<CurrentApiPage />} />
        <Route path="/:slug" element={<VariantPage />} />
      </Routes>
    </main>
  );
}
