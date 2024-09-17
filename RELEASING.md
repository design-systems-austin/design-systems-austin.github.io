# Releasing a new version of this website

## Prepare the release

The release process is automated by [changesets]. This way it's easy to understand what changed, when.

After you familiarize yourself with how they work. We use a [Gihtub action workflow integrated in ci](https://github.com/atlassian/changesets#integrating-with-ci).

1. Visit the pull requests page. If there isn't one, we'll need to build the next release by merging in PRs with changeset files.

## Preview the release candidate in the browser:

TODO.

## Publish the release

1. If the release PR got approved and you've done necessary testing, merge it.

   After tests run, the new website will be deployed.

2. Done! 🎉
