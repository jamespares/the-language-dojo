import type { Db } from "../db/client";
import { userProgress, mistakes } from "../db/schema";
import { eq, and } from "drizzle-orm";

export async function recordAnswer(
  db: Db,
  userId: number,
  module: string,
  itemId: string,
  correct: boolean
) {
  // Update progress
  const existing = await db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.module, module), eq(userProgress.itemId, itemId)))
    .get();

  if (existing) {
    await db
      .update(userProgress)
      .set({
        correctCount: existing.correctCount + (correct ? 1 : 0),
        incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
        lastReviewed: new Date(),
      })
      .where(eq(userProgress.id, existing.id));
  } else {
    await db.insert(userProgress).values({
      userId,
      module,
      itemId,
      correctCount: correct ? 1 : 0,
      incorrectCount: correct ? 0 : 1,
      lastReviewed: new Date(),
    });
  }

  // Handle mistakes
  if (!correct) {
    const existingMistake = await db
      .select()
      .from(mistakes)
      .where(and(eq(mistakes.userId, userId), eq(mistakes.module, module), eq(mistakes.itemId, itemId)))
      .get();

    if (existingMistake) {
      await db
        .update(mistakes)
        .set({
          mistakeCount: existingMistake.mistakeCount + 1,
          lastMistakeAt: new Date(),
        })
        .where(eq(mistakes.id, existingMistake.id));
    } else {
      await db.insert(mistakes).values({
        userId,
        module,
        itemId,
        mistakeCount: 1,
        reviewCount: 0,
      });
    }
  } else {
    // If correct and mistake exists, increment review count
    const existingMistake = await db
      .select()
      .from(mistakes)
      .where(and(eq(mistakes.userId, userId), eq(mistakes.module, module), eq(mistakes.itemId, itemId)))
      .get();

    if (existingMistake) {
      await db
        .update(mistakes)
        .set({
          reviewCount: existingMistake.reviewCount + 1,
        })
        .where(eq(mistakes.id, existingMistake.id));
    }
  }
}

export async function getMistakeItemIds(db: Db, userId: number, module: string): Promise<string[]> {
  const items = await db
    .select()
    .from(mistakes)
    .where(and(eq(mistakes.userId, userId), eq(mistakes.module, module)))
    .all();

  return items.filter(m => m.reviewCount < 2).map(m => m.itemId);
}

export function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  const next = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleArray<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function getStats(db: Db, userId: number, module: string) {
  const progress = await db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.module, module)))
    .all();

  const total = progress.length;
  const correct = progress.reduce((sum, p) => sum + p.correctCount, 0);
  const incorrect = progress.reduce((sum, p) => sum + p.incorrectCount, 0);

  return { total, correct, incorrect };
}
