import React, { memo } from 'react';

function RedditPost() {
  return (
    <div>
      <blockquote
        className="reddit-embed-bq"
        style={{ height: '500px' }}
        data-embed-height="500"
      >
        <a href="https://www.reddit.com/r/clevercomebacks/comments/1639dl9/refugees_from_the_third_world/">
          Refugees from the Third World
        </a>
        <br />
        by
        <a href="https://www.reddit.com/user/StrangeSwiming">
          u/StrangeSwiming
        </a>
        in
        <a href="https://www.reddit.com/r/clevercomebacks/">clevercomebacks</a>
      </blockquote>
      <script
        async={true}
        src="https://embed.reddit.com/widgets.js"
        charSet="UTF-8"
      ></script>
    </div>
  );
}

export default memo(RedditPost);
