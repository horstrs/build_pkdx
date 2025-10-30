type CacheEntry<T> = {
  createdAt: number,
  val: T,
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId:NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number){
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap() {
    this.#cache.forEach((entry, key) => {
      if (Date.now() - entry.createdAt > this.#interval){
        this.#cache.delete(key)
      }
    })
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  add<T>(key: string, val: T) {
    const newEntry:CacheEntry<T> = {createdAt: Date.now(), val};
    this.#cache.set(key, newEntry);
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
    return undefined;
  }

  stopReapLoop() {
    if(this.#reapIntervalId){
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}