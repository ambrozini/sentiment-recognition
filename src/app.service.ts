import { Injectable } from '@nestjs/common';
import { SentimentAnalyzer as NaturalAnalyzer, PorterStemmer } from 'natural';
import { SentimentAnalyzer } from 'node-nlp';

// type Sentiment = 'negative' | 'positive' | 'neutral';
type Sentiment = number;

@Injectable()
export class AppService {
  private natural = new NaturalAnalyzer('English', PorterStemmer, 'afinn');
  private nlp = new SentimentAnalyzer({ language: 'en' });

  getNaturalSentiment(text: string): Sentiment {
    const input = text.split(` `);
    const result = this.natural.getSentiment(input);

    return (result / 3) * 100;
  }

  async getNlpSentiment(text: string): Promise<Sentiment> {
    const { score } = await this.nlp.getSentiment(text);
    return score * 100;
  }
}
