import type { Provider } from "@opencode-ai/sdk/v2"

export function parse(value: string) {
  const [providerID, ...modelID] = value.split("/")
  return { providerID, modelID: modelID.join("/") }
}

export function index(list: Provider[] | undefined) {
  return new Map((list ?? []).map((item) => [item.id, item] as const))
}

export function get(list: Provider[] | ReadonlyMap<string, Provider> | undefined, providerID: string, modelID: string) {
  const provider =
    list instanceof Map
      ? list.get(providerID)
      : Array.isArray(list)
        ? list.find((item) => item.id === providerID)
        : undefined
  return provider?.models[modelID]
}

export function name(
  list: Provider[] | ReadonlyMap<string, Provider> | undefined,
  providerID: string,
  modelID: string,
) {
  return get(list, providerID, modelID)?.name ?? modelID
}

// A model is a free NVIDIA NIM preview endpoint when models.dev reports zero
// input cost for it: build.nvidia.com preview NIMs are free, while the flagship
// Nemotron production endpoints carry a price. Data-driven so the list never goes
// stale. Display-only — never affects the model id used for routing/API calls.
export function isFreeNvidiaPreview(
  providerID: string,
  model: { cost?: { input?: number } } | undefined,
) {
  return providerID === "nvidia" && model?.cost?.input === 0
}
