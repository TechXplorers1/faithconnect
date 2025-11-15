'use server';

/**
 * @fileOverview AI-powered sermon summarization flow.
 *
 * - generateSermonSummary - A function that generates a short, engaging summary of a sermon using AI.
 * - GenerateSermonSummaryInput - The input type for the generateSermonSummary function.
 * - GenerateSermonSummaryOutput - The return type for the generateSermonSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSermonSummaryInputSchema = z.object({
  sermonText: z
    .string()
    .describe('The text content of the sermon to be summarized.'),
});
export type GenerateSermonSummaryInput = z.infer<
  typeof GenerateSermonSummaryInputSchema
>;

const GenerateSermonSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A short, engaging summary of the sermon content.'),
});
export type GenerateSermonSummaryOutput = z.infer<
  typeof GenerateSermonSummaryOutputSchema
>;

export async function generateSermonSummary(
  input: GenerateSermonSummaryInput
): Promise<GenerateSermonSummaryOutput> {
  return generateSermonSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSermonSummaryPrompt',
  input: {schema: GenerateSermonSummaryInputSchema},
  output: {schema: GenerateSermonSummaryOutputSchema},
  prompt: `You are an AI assistant that generates short, engaging summaries of sermons.

  Sermon Text: {{{sermonText}}}

  Generate a summary of the sermon that is no more than three sentences long.
  The summary should be engaging and entice the reader to watch the sermon. Focus on the key message and takeaways of the sermon.
  `,
});

const generateSermonSummaryFlow = ai.defineFlow(
  {
    name: 'generateSermonSummaryFlow',
    inputSchema: GenerateSermonSummaryInputSchema,
    outputSchema: GenerateSermonSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
