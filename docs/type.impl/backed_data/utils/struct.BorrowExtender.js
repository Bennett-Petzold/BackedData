(function() {var type_impls = {
"backed_data":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-AsMut%3CV%3E-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#246-250\">source</a><a href=\"#impl-AsMut%3CV%3E-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;V&gt;, V&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;V&gt; for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.as_mut\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#247-249\">source</a><a href=\"#method.as_mut\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsMut.html#tymethod.as_mut\" class=\"fn\">as_mut</a>(&amp;mut self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut V</a></h4></section></summary><div class='docblock'>Converts this type into a mutable reference of the (usually inferred) input type.</div></details></div></details>","AsMut<V>","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-AsRef%3CV%3E-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#240-244\">source</a><a href=\"#impl-AsRef%3CV%3E-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;V&gt;, V&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;V&gt; for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.as_ref\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#241-243\">source</a><a href=\"#method.as_ref\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsRef.html#tymethod.as_ref\" class=\"fn\">as_ref</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;V</a></h4></section></summary><div class='docblock'>Converts this type into a shared reference of the (usually inferred) input type.</div></details></div></details>","AsRef<V>","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BorrowExtender%3CT,+Option%3CV%3E%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#288-295\">source</a><a href=\"#impl-BorrowExtender%3CT,+Option%3CV%3E%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, V&gt; <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.open_option\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#289-294\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.open_option\" class=\"fn\">open_option</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, V&gt;&gt;</h4></section></div></details>",0,"backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BorrowExtender%3CT,+Result%3CV,+F%3E%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#279-286\">source</a><a href=\"#impl-BorrowExtender%3CT,+Result%3CV,+F%3E%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, V, F&gt; <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;V, F&gt;&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.open_result\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#280-285\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.open_result\" class=\"fn\">open_result</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, V&gt;, F&gt;</h4></section></div></details>",0,"backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#155-225\">source</a><a href=\"#impl-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.a_new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#156-165\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_new\" class=\"fn\">a_new</a>&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = U&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.ExtenderPtr.html\" title=\"struct backed_data::utils::ExtenderPtr\">ExtenderPtr</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; Self</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span><section id=\"method.a_try_new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#167-176\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_try_new\" class=\"fn\">a_try_new</a>&lt;W, F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, W&gt;&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.ExtenderPtr.html\" title=\"struct backed_data::utils::ExtenderPtr\">ExtenderPtr</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, W&gt;</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span><section id=\"method.a_maybe_new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#178-187\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_maybe_new\" class=\"fn\">a_maybe_new</a>&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;U&gt;&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.ExtenderPtr.html\" title=\"struct backed_data::utils::ExtenderPtr\">ExtenderPtr</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span><section id=\"method.a_new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#189-198\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_new_mut\" class=\"fn\">a_new_mut</a>&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = U&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.SendNonNull.html\" title=\"struct backed_data::utils::SendNonNull\">SendNonNull</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; Self</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span><section id=\"method.a_try_new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#200-213\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_try_new_mut\" class=\"fn\">a_try_new_mut</a>&lt;W, F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, W&gt;&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.SendNonNull.html\" title=\"struct backed_data::utils::SendNonNull\">SendNonNull</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, W&gt;</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span><section id=\"method.a_maybe_new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#215-224\">source</a><h4 class=\"code-header\">pub async fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.a_maybe_new_mut\" class=\"fn\">a_maybe_new_mut</a>&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;U&gt;&gt;, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"backed_data/utils/struct.SendNonNull.html\" title=\"struct backed_data::utils::SendNonNull\">SendNonNull</a>&lt;T&gt;) -&gt; F&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section><span class=\"item-info\"><div class=\"stab portability\">Available on <strong>crate feature <code>async</code></strong> only.</div></span></div></details>",0,"backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#26-80\">source</a><a href=\"#impl-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#27-33\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.new\" class=\"fn\">new</a>&lt;V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;T</a>) -&gt; U&gt;(parent: T, child: V) -&gt; Self</h4></section><section id=\"method.try_new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#35-41\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.try_new\" class=\"fn\">try_new</a>&lt;W, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;T</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, W&gt;&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, W&gt;</h4></section><section id=\"method.maybe_new\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#43-49\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.maybe_new\" class=\"fn\">maybe_new</a>&lt;V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;T</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;U&gt;&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section><section id=\"method.new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#51-57\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.new_mut\" class=\"fn\">new_mut</a>&lt;V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/ptr/non_null/struct.NonNull.html\" title=\"struct core::ptr::non_null::NonNull\">NonNull</a>&lt;T&gt;) -&gt; U&gt;(parent: T, child: V) -&gt; Self</h4></section><section id=\"method.try_new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#59-68\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.try_new_mut\" class=\"fn\">try_new_mut</a>&lt;W, V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/ptr/non_null/struct.NonNull.html\" title=\"struct core::ptr::non_null::NonNull\">NonNull</a>&lt;T&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, W&gt;&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, W&gt;</h4></section><section id=\"method.maybe_new_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#70-79\">source</a><h4 class=\"code-header\">pub fn <a href=\"backed_data/utils/struct.BorrowExtender.html#tymethod.maybe_new_mut\" class=\"fn\">maybe_new_mut</a>&lt;V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/ptr/non_null/struct.NonNull.html\" title=\"struct core::ptr::non_null::NonNull\">NonNull</a>&lt;T&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;U&gt;&gt;(\n    parent: T,\n    child: V,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section></div></details>",0,"backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#14\">source</a><a href=\"#impl-Debug-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + StableDeref, U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#14\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/nightly/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deref-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#227-232\">source</a><a href=\"#impl-Deref-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.Deref.html\" title=\"trait core::ops::deref::Deref\">Deref</a> for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Target\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Target\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.Deref.html#associatedtype.Target\" class=\"associatedtype\">Target</a> = U</h4></section></summary><div class='docblock'>The resulting type after dereferencing.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.deref\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#229-231\">source</a><a href=\"#method.deref\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.Deref.html#tymethod.deref\" class=\"fn\">deref</a>(&amp;self) -&gt; &amp;Self::<a class=\"associatedtype\" href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.Deref.html#associatedtype.Target\" title=\"type core::ops::deref::Deref::Target\">Target</a></h4></section></summary><div class='docblock'>Dereferences the value.</div></details></div></details>","Deref","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-DerefMut-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#234-238\">source</a><a href=\"#impl-DerefMut-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.DerefMut.html\" title=\"trait core::ops::deref::DerefMut\">DerefMut</a> for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deref_mut\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#235-237\">source</a><a href=\"#method.deref_mut\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.DerefMut.html#tymethod.deref_mut\" class=\"fn\">deref_mut</a>(&amp;mut self) -&gt; &amp;mut Self::<a class=\"associatedtype\" href=\"https://doc.rust-lang.org/nightly/core/ops/deref/trait.Deref.html#associatedtype.Target\" title=\"type core::ops::deref::Deref::Target\">Target</a></h4></section></summary><div class='docblock'>Mutably dereferences the value.</div></details></div></details>","DerefMut","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq%3C%26U%3E-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#252-259\">source</a><a href=\"#impl-PartialEq%3C%26U%3E-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, T: StableDeref, U&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'a U</a>&gt; for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;<div class=\"where\">where\n    U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'a U</a>&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#256-258\">source</a><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'a U</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>self</code> and <code>other</code> values to be equal, and is used by <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#261\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>!=</code>. The default implementation is almost always sufficient,\nand should not be overridden without very good reason.</div></details></div></details>","PartialEq<&'a U>","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq%3CU%3E-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#261-268\">source</a><a href=\"#impl-PartialEq%3CU%3E-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>&lt;U&gt; for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;<div class=\"where\">where\n    U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>&lt;U&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#265-267\">source</a><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;U</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>self</code> and <code>other</code> values to be equal, and is used by <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#261\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>!=</code>. The default implementation is almost always sufficient,\nand should not be overridden without very good reason.</div></details></div></details>","PartialEq<U>","backed_data::utils::extender::BorrowNest"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialOrd%3CU%3E-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#270-277\">source</a><a href=\"#impl-PartialOrd%3CU%3E-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a>&lt;U&gt; for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;<div class=\"where\">where\n    U: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a>&lt;U&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.partial_cmp\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#274-276\">source</a><a href=\"#method.partial_cmp\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#tymethod.partial_cmp\" class=\"fn\">partial_cmp</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;U</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/cmp/enum.Ordering.html\" title=\"enum core::cmp::Ordering\">Ordering</a>&gt;</h4></section></summary><div class='docblock'>This method returns an ordering between <code>self</code> and <code>other</code> values if one exists. <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#tymethod.partial_cmp\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.lt\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#1178\">source</a></span><a href=\"#method.lt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.lt\" class=\"fn\">lt</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests less than (for <code>self</code> and <code>other</code>) and is used by the <code>&lt;</code> operator. <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.lt\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.le\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#1196\">source</a></span><a href=\"#method.le\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.le\" class=\"fn\">le</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests less than or equal to (for <code>self</code> and <code>other</code>) and is used by the\n<code>&lt;=</code> operator. <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.le\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.gt\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#1214\">source</a></span><a href=\"#method.gt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.gt\" class=\"fn\">gt</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests greater than (for <code>self</code> and <code>other</code>) and is used by the <code>&gt;</code>\noperator. <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.gt\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ge\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#1232\">source</a></span><a href=\"#method.ge\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.ge\" class=\"fn\">ge</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests greater than or equal to (for <code>self</code> and <code>other</code>) and is used by\nthe <code>&gt;=</code> operator. <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html#method.ge\">Read more</a></div></details></div></details>","PartialOrd<U>","backed_data::utils::extender::BorrowNest"],["<section id=\"impl-StableDeref-for-BorrowExtender%3CT,+U%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/backed_data/utils/extender.rs.html#22\">source</a><a href=\"#impl-StableDeref-for-BorrowExtender%3CT,+U%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: StableDeref, U: StableDeref&gt; StableDeref for <a class=\"struct\" href=\"backed_data/utils/struct.BorrowExtender.html\" title=\"struct backed_data::utils::BorrowExtender\">BorrowExtender</a>&lt;T, U&gt;</h3></section>","StableDeref","backed_data::utils::extender::BorrowNest"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()