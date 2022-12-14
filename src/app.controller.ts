import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('natural')
  getNaturalSentiment(@Query() { text }: { text: string }): { score: number } {
    return { score: this.appService.getNaturalSentiment(text) };
  }

  @Get('nlp')
  async getSentiment(
    @Query() { text }: { text: string },
  ): Promise<{ score: number }> {
    return { score: await this.appService.getNlpSentiment(text) };
  }
}
