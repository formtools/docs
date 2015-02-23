## Form Tools Documentation

This repo contains the Form Tools documentation for upcoming Form Tools site, to be found at docs.formtools.org.

The website, documentation and module documentation all use [Jekyll](http://jekyllrb.com/) to handle generating 
the actual documentation. Jekyll is a *static website generator*, letting you us.  

This has a number of benefits:
- more secure. The existing Form Tools site currently has a whole bunch of different pieces of software running on it, 
and it's been hacked more than once.  
- Speed! Static files are far faster to load than the PHP/MySQL-heavy website right now. 
- Open! Now that the doc is in a public repo, it'll make it super easy for people to contribute and fix documentation,
unlike now, where the doc is in a closed MySQL DB.

As noted, the documentation will eventually end up on docs.formtools.org, but right now you can find it on github 
pages, here: http://formtools.github.io/docs


## Contributing

Fixes to the documentation and contributions are always welcome! You can contribute in two ways:
1. Browse the documentation online and click the "EDIT PAGE" button when you find an error, or something you'd like to
improve on. That will take you to github.com where you can edit the page right through your web browser.
2. Clone the repository and build it locally. There, make your changes and submit a *pull request*. You might want to 
do this if you want to contribute a new tutorial, for example.

I'll manually review all contributions.

### How to build locally

If you want to run the documentation locally, do the following:

1. Clone this repo.
2. Install Jekyll via the [instructions here](http://jekyllrb.com/docs/installation/)
3. Once it's been installed, open up terminal/command line, navigate to the root folder of this repo and enter:
`jekyll serve --watch`

That starts a local server which you can access at `http://localhost:4000/docs/`. At this point, you can edit the files
locally and the HTML files will be automatically regenerated on the fly.


### Screenshots

Screenshots can spruce up a rather boring doc page. To include a screenshot, do the following:

1. Add the image and thumbnail to the assets/screenshots folder. The thumbnail should have a width of `250px`; the full-size
image should have a width of `1024px` or less. Please call the file whatever makes sense - the existing iXXX.jpg 
filename convention was just because it was formerly in a CMS and the filenames were auto-generated. Regarding format, 
jpg, gif or png is fine, but jpg is preferred.
2. Edit the `_data/screenshots.yml` file and add a new record for the new screenshot. Just look at the existing entries and
copy the format. It's not brain surgery.
3. To include your screenshot in a page, use the following template code:
```
{% include screenshot.html item='i223.jpg' %}
```

Tip: I use the Live Templates feature of my IDE (PHPStorm) to add this and syntax highlighting automatically into the
markup. It really helps cut down on copy-paste time.


### Integration with the website

This section's just for me, so I don't forget how it works. Move along, move along please. Nothing to see here.

1. The formtools-site build script downloads this repo to `repos/docs`
2. It then overwrites `_includes/top_nav.html`, `_includes/footer.html` with templates found in the formtools-site repo.
3. It then runs Jekyll and builds it to the `docs.formtools.org` folder, now with the appropriate website branding.   


### Ruby dev help wanted!

I spent some time on this, but didn't get very far. So instead of spinning my wheels I decided to hardcode some stuff
just to get things moving. But in case there's a Ruby developer who fancies lending a hand, I'd love help on the following.

- I wanted to retain the prev/next links + labels that appear on each page - like with the old documentation. So when
Ideally, I wanted to just store a reference to the prev/next page via a YAML value in the page, then have a plugin
dynamically parse out the prev/next page's title. That way it would cut down on hardcoded strings in the
YAML settings for each page. Right now those strings are duplicated (actually triplicated! Boo!)

- The breadcrumb nav sucks. It should also be dynamic.

Really I'm just not happy with all the YAML settings being loaded up for each page. It could be way smarter.
