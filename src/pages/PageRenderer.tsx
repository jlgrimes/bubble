import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PageRendererProps {
  /**
   * Path of the markdown file.
   */
  path: string;
}

export const PageRenderer = (props: PageRendererProps) => {
  const [markdown, setMarkdown] = React.useState<string>('');

  React.useEffect(() => {
    const filePath = require('./About.md');

    fetch(filePath)
      .then(res => res.text())
      .then(text => {
        setMarkdown(text);
      });
  }, []);

  return <ReactMarkdown linkTarget='_blank'>{markdown}</ReactMarkdown>;
};
