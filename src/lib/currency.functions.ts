import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const convertToBRL = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({
      from: z.string().length(3).toUpperCase(),
      amount: z.number().positive().max(1_000_000),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    if (data.from === "BRL") {
      return { rate: 1, converted: data.amount, from: "BRL", to: "BRL", date: new Date().toISOString().slice(0, 10) };
    }
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${data.amount}&from=${data.from}&to=BRL`);
      if (!res.ok) {
        return { error: "Não foi possível obter cotação agora.", rate: 0, converted: 0, from: data.from, to: "BRL", date: "" };
      }
      const json = (await res.json()) as { rates: Record<string, number>; date: string };
      const converted = json.rates?.BRL ?? 0;
      return { rate: converted / data.amount, converted, from: data.from, to: "BRL", date: json.date };
    } catch (e) {
      console.error(e);
      return { error: "Erro de rede ao consultar cotação.", rate: 0, converted: 0, from: data.from, to: "BRL", date: "" };
    }
  });
