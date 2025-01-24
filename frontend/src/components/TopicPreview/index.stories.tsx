'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { ReduxProvider, AuthenticationProvider, ReactQueryProvider } from '@/providers';
import { ThemeContextProvider } from '@/contexts/themeContext';
import Topic, { TopicProps } from './index';

const meta: Meta<typeof Topic> = {
  title: 'TopicPreview',
  argTypes: {
    topic: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof Topic>;

export const Component: Story = ({ topic }: TopicProps) => (
  <AuthenticationProvider>
    <ThemeContextProvider>
      <ReduxProvider>
        <ReactQueryProvider>
          <Topic topic={topic} />
        </ReactQueryProvider>
      </ReduxProvider>
    </ThemeContextProvider>
  </AuthenticationProvider>
);

Component.args = {
  topic: {
    _id: '65aa86854a63720207b56cb4',
    description:
      "Exploring the nuances of artificial intelligence (AI), our latest articles encompass a range of topics showcasing the ever-evolving field. One article dives into the synergy between domain expertise and data-driven AI in well logging, illustrating the power of these technologies in probabilistic data analysis. Another article scrutinizes the often conflated concepts of AI and machine learning, shedding light on the distinctions that matter. Amidst tech giants' endeavors, reports suggest the iPhone could soon integrate AI from Google or OpenAI, a move signaling AI's growing consumer market influence. The AI Days 2024 conference in India is set to bring together thousands, signifying India's commitment to the conversation on AI and machine learning. Energy management and optimization are also under the AI lens, indicating a future where energy production and distribution are more efficient and sustainable. The Associated Press represents one of news media's early adopters, integrating AI to enhance its reporting processes. Meanwhile, practical guides to leveraging GPUs for machine learning applications underline the technological backbone of AI advancements. While widespread discussions on reinforcement learning from human feedback emphasize the role of user-engaged AI systems. Software development companies, such as Caz Brain, are making strides by implementing AI and machine learning into their app creation endeavors. The articles collectively paint a future where AI's role is significant across various domains, from crafting personalized education solutions to the ethical implications and societal impacts of these intelligent systems. Through various lenses, from national conferences to robust debates and regional advancements, the conversation around artificial intelligence is more dynamic and far-reaching than ever before.",

    reference_links: [],
    popularity: 10,
    title: 'Advancements in Artificial Intelligence',
    categories: [],
    summary:
      "Exploring the nuances of artificial intelligence (AI), our latest articles encompass a range of topics showcasing the ever-evolving field. One article dives into the synergy between domain expertise and data-driven AI in well logging, illustrating the power of these technologies in probabilistic data analysis. Another article scrutinizes the often conflated concepts of AI and machine learning, shedding light on the distinctions that matter. Amidst tech giants' endeavors, reports suggest the iPhone could soon integrate AI from Google or OpenAI, a move signaling AI's growing consumer market influence. The AI Days 2024 conference in India is set to bring together thousands, signifying India's commitment to the conversation on AI and machine learning. Energy management and optimization are also under the AI lens, indicating a future where energy production and distribution are more efficient and sustainable. The Associated Press represents one of news media's early adopters, integrating AI to enhance its reporting processes. Meanwhile, practical guides to leveraging GPUs for machine learning applications underline the technological backbone of AI advancements. While widespread discussions on reinforcement learning from human feedback emphasize the role of user-engaged AI systems. Software development companies, such as Caz Brain, are making strides by implementing AI and machine learning into their app creation endeavors. The articles collectively paint a future where AI's role is significant across various domains, from crafting personalized education solutions to the ethical implications and societal impacts of these intelligent systems. Through various lenses, from national conferences to robust debates and regional advancements, the conversation around artificial intelligence is more dynamic and far-reaching than ever before.",
  },
};
