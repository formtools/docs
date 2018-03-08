# CodeMirror
#
# A simple tag for wrapping a code block in a <pre> with a codemirror class and a data-lang attribute. This
# is sufficient info for the client-side code to highlight the block.

module Jekyll
	class CodeMirror < Liquid::Block
        def initialize(tag_name, lang, tokens)
            super
            @lang = lang.to_s.strip
        end

		def render(context)
		    require 'cgi'
		    '<pre class="codemirror" data-lang="' + @lang.to_s + '">' + CGI.escapeHTML(super.strip) + '</pre>'
		end
	end
end

Liquid::Template.register_tag('codemirror', Jekyll::CodeMirror)
