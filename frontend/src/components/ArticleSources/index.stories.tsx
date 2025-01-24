'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { ReduxProvider } from '@/providers';
import ArticleSources, { ArticleSourcesProps } from './index';

const meta: Meta<typeof ArticleSources> = {
  title: 'ArticleSources',
  argTypes: {
    sources: { control: 'object' },
    isDark: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ArticleSources>;

export const Component: Story = ({ sources, isDark }: ArticleSourcesProps) => (
  <ReduxProvider>
    <ArticleSources sources={sources} isDark={isDark} />
  </ReduxProvider>
);

Component.args = {
  sources: [
    {
      title: 'The difference between artificial intelligence and machine learning and why it matters',
      source_name: 'News',
      link: 'https://breakingdefense.com/2024/03/the-difference-between-artificial-intelligence-and-machine-learning-and-why-it-matters/',
      _id: '65f28bdff84749a4bf6f49a3',
    },
    {
      title: "Artificial intelligence vs machine learning: what's the difference?",
      source_name: 'News',
      link: 'https://www.msn.com/en-us/money/technology/artificial-intelligence-vs-machine-learning-what-s-the-difference/ar-BB1jz52D',
      _id: '65f28bdff84749a4bf6f49a8',
    },
    {
      title:
        'Forget Nvidia: Billionaire Investors Are Selling It and Buying These 2 Artificial Intelligence (AI) Stocks Instead',
      source_name: 'News',
      link: 'https://www.msn.com/en-us/money/companies/forget-nvidia-billionaire-investors-are-selling-it-and-buying-these-2-artificial-intelligence-ai-stocks-instead/ar-BB1jKhPI',
      _id: '65f28bdff84749a4bf6f49aa',
    },
    {
      title: 'A (very) basic guide to artificial intelligence',
      source_name: 'News',
      link: 'https://www.thehindu.com/sci-tech/science/artificial-intelligence-machine-learning-explainer/article67938899.ece',
      _id: '65f28bdff84749a4bf6f49ab',
    },
    {
      title: "10 Reasons I Wouldn't Touch Artificial Intelligence (AI) Stock Nvidia With a 10-Foot Pole Right Now",
      source_name: 'News',
      link: 'https://www.msn.com/en-us/money/savingandinvesting/10-reasons-i-wouldnt-touch-artificial-intelligence-ai-stock-nvidia-with-a-10-foot-pole-right-now/ar-BB1jOgM1',
      _id: '65f28bdff84749a4bf6f49ae',
    },
    {
      title: 'Tech Roundtable: How Artificial Intelligence Has Refocused Video Surveillance Deployment',
      source_name: 'News',
      link: 'https://www.securityinfowatch.com/video-surveillance/article/53097419/hanwha-vision-tech-roundtable-how-artificial-intelligence-has-refocused-video-surveillance-deployment',
      _id: '65f28bdff84749a4bf6f49af',
    },
    {
      title: '11 Best Artificial Intelligence Stocks Under $20 According To Hedge Funds',
      source_name: 'News',
      link: 'https://finance.yahoo.com/news/11-best-artificial-intelligence-stocks-111750748.html',
      _id: '65f28bdff84749a4bf6f49b0',
    },
    {
      title:
        'Navigating the AI Revolution – Understanding the Impact of Artificial Intelligence on Society and Economics',
      source_name: 'News',
      link: 'https://www.msn.com/en-us/news/technology/navigating-the-ai-revolution-understanding-the-impact-of-artificial-intelligence-on-society-and-economics/ar-BB1jAA27',
      _id: '65f28bdff84749a4bf6f49b1',
    },
    {
      title: 'BUILDING INSIGHTS: Artificial Intelligence impacts within the AEC industry',
      source_name: 'News',
      link: 'https://www.readingeagle.com/2024/03/12/building-insights-artificial-intelligence-impacts-within-the-aec-industry/',
      _id: '65f28bdff84749a4bf6f49b4',
    },
    {
      title: 'Quisitive Awarded the AI and Machine Learning in Microsoft Azure Specialization',
      source_name: 'News',
      link: 'https://markets.businessinsider.com/news/stocks/quisitive-awarded-the-ai-and-machine-learning-in-microsoft-azure-specialization-1033142131',
      _id: '65f28bdff84749a4bf6f49ba',
    },
    {
      title: 'The Top 10 AI 3D Generators of 2024: Leading the Way in Digital Art and Design',
      source_name: 'News',
      link: 'https://www.thetechedvocate.org/the-top-10-ai-3d-generators-of-2024-leading-the-way-in-digital-art-and-design/',
      _id: '65f28bdff84749a4bf6f49bf',
    },
    {
      title:
        'Nasdaq All-Time High: 3 Artificial Intelligence (AI) Stocks That Led the Index to Its Highest Level Ever (and Can Help Set You Up for Life)',
      source_name: 'News',
      link: 'https://finance.yahoo.com/news/nasdaq-time-high-3-artificial-120000194.html?fr=sycsrp_catchall',
      _id: '65f28bdff84749a4bf6f49c0',
    },
    {
      title: "You'll soon be able to talk to something kind of resembling Marilyn Monroe, via AI",
      source_name: 'News',
      link: 'https://www.avclub.com/marilyn-monroe-artificial-intelligence-soul-machine-1851321419',
      _id: '65f28bdff84749a4bf6f49c3',
    },
    {
      title: 'AI And The Ghost In The Machine',
      source_name: 'News',
      link: 'https://hackaday.com/2017/02/06/ai-and-the-ghost-in-the-machine/',
      _id: '65f28bdff84749a4bf6f49c7',
    },
    {
      title: 'Artificial Intelligence and Machine Learning: News',
      source_name: 'News',
      link: 'https://www.newsbytesapp.com/news/science/artificial-intelligence-and-machine-learning',
      _id: '65f28bdff84749a4bf6f49d3',
    },
  ],
};
