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

// Free NVIDIA NIM *preview* endpoints (build.nvidia.com, nimType=nim_type_preview).
// Display-only — never used for routing or API calls. Verify IDs against the
// actual keys in provider.models; maintain here as NVIDIA promotes/retires previews.
const NVIDIA_FREE_PREVIEW_MODELS = new Set<string>([
  "nemotron-3-super-120b-a12b",
  "nemotron-3-ultra-550b-a55b",
  "llama-3.3-nemotron-super-49b-v1.5",
])

export function isFreeNvidiaPreview(providerID: string, modelID: string) {
  return providerID === "nvidia" && NVIDIA_FREE_PREVIEW_MODELS.has(modelID)
}
