.PHONY: css

static_dir=static

less_dir=${static_dir}/less
less_index=${less_dir}/styles.less

css_dir=${static_dir}/css
css_index=${css_dir}/styles.css

# css generates CSS file contents from less
css:
	lessc ${less_index} ${css_index}
