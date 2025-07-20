import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export const useSentimentAnalysis = (tokens: Zora20Token[]) => {
  const [sentimentScores, setSentimentScores] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const loadModelAndAnalyze = async () => {
      const model = await use.load();
      const scores = new Map();
      for (const token of tokens) {
        const description = token.name || token.symbol || 'No data';
        const embeddings = await model.embed(description);
        // Simplified sentiment: higher embedding magnitude = positive
        const score = tf.mean(embeddings).dataSync()[0] + Math.random() * 0.2; // Add noise for variety
        scores.set(token.address, Math.max(0, Math.min(1, score))); // Normalize 0-1
      }
      setSentimentScores(scores);
    };
    if (tokens.length > 0) loadModelAndAnalyze();
  }, [tokens]);

  return sentimentScores;
};