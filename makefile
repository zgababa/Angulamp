TESTS = test/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
	   	--reporter $(REPORTER) \
		--timeout 300 \
		--growl \
		$(TESTS)
.PHONY: test