## docs

This section contains the Form Tools documentation for the new Form Tools site, to be found at docs.formtools.org. With
the new site (to be released later in 2014), all documentation is editable via github.

I'll expand on all this later, but it's now going to use Jekyll to handle generating the actual documentation. This should
make it super easy for people to contribute and fix documentation - not like now, where the doc is in a closed MySQL DB.

### How to build locally

Instructions coming soon.


### Screenshots

To include a screenshot, do the following:

1. Upload the main image and thumbnail to the assets/screenshots folder. The thumbnail should have a width of 250px; the full-size
image should be under 1024 width. Please call the file whatever makes sense - the existing iXXX.jpg filename convention was just
because it was formerly in a CMS.
2. Edit the _data/screenshots.yml file and add a new record for the new screenshot.
3. Include the screenshot in the page, like so:
```
{% include screenshot.html item='i223.jpg' %}
```


### Ruby dev help wanted!

I spent some time on this, but didn't get very far. So instead of spinning my wheels I decided to hardcode some stuff
just to get things moving. But in case there's a Ruby developer who fancies lending a hand, I'd love help on the following:

- I wanted to retain the prev/next links + labels, like with the old site. So when on a doc page it would provide a link
to the next and previous documentation page. I wanted to just store a reference to those files via a YAML value in the page,
then have a plugin dynamically parse out the prev/next page's heading. That way it would cut down on hardcoded strings in the
YAML settings for each page.

- The breadcrumb nav sucks. It should also be dynamic.

Really I'm just not happy with all the YAML settings being loaded up for each page.