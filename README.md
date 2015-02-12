## Form Tools Documentation

### Overview

This section contains the Form Tools documentation for the new Form Tools site, to be found at docs.formtools.org. With
the new site (to be released later in 2014), all documentation is editable via github.

I'll expand on all this later, but it's now going to use Jekyll to handle generating the actual documentation. This should
make it super easy for people to contribute and fix documentation - not like now, where the doc is in a closed MySQL DB.

The documentation will eventually end up on docs.formtools.org, but right now you can find it on github pages, here:
http://formtools.github.io/docs


## Contributing

Fixes to the documentation and contributions are always welcome! You can contribute in two ways:
1. Browse the documentation online and click the "EDIT PAGE" button when you find an error, or something you'd like to
improve on. That will take you to github.com where you can edit the page right through your web browser.
2. Clone the repository and build it locally. There, make your changes and submit a *pull request*.

I will manually review all contributions.

### How to build locally

Generally, contributing should be done via github by just editing the page, but if you'd like to 

1. Clone this repo.
2. Install Jekyll via the [instructions here](http://jekyllrb.com/docs/installation/)
3. Once it's been installed, open up terminal/command line, navigate to the root folder of this repo and enter:
`jekyll serve --watch --baseurl ''`

That starts a local server which you can access at `http://localhost:4000/`. At this point, you can edit the files
locally and the HTML files will be automatically regenerated on the fly.


### Screenshots

To include a screenshot, do the following:

1. Upload the main image and thumbnail to the assets/screenshots folder. The thumbnail should have a width of 250px; the full-size
image should be under 1024 width. Please call the file whatever makes sense - the existing iXXX.jpg filename convention was just
because it was formerly in a CMS. Regarding format, jpg, gif or png is fine, but jpg is preferred.
2. Edit the _data/screenshots.yml file and add a new record for the new screenshot. Just look at the existing entries and
copy the format.
3. To include your screenshot in a page, just use the following code:
```
{% include screenshot.html item='i223.jpg' %}
```

Tip: I use the Live Templates feature of my IDE (PHPStorm) to add this and syntax highlighting automatically into the
markup. It really helps cut down on copy-paste time.


### Ruby dev help wanted!

I spent some time on this, but didn't get very far. So instead of spinning my wheels I decided to hardcode some stuff
just to get things moving. But in case there's a Ruby developer who fancies lending a hand, I'd love help on the following.

- I wanted to retain the prev/next links + labels that appear on each page - like with the old documentation. So when
Ideally, I wanted to just store a reference to the prev/next page via a YAML value in the page, then have a plugin
dynamically parse out the prev/next page's title. That way it would cut down on hardcoded strings in the
YAML settings for each page. Right now those strings are duplicated (actually triplicated! Boo!)

- The breadcrumb nav sucks. It should also be dynamic.

Really I'm just not happy with all the YAML settings being loaded up for each page. It could be way smarter.
