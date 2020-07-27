package com.vingsoft.core.exception;

/**
 * 

* <p>Title: PlatformException</p>  

* <p>Description: 平台异常</p>  

* @author MrTang

* @date 2018年11月28日
 */

public class PlatformException extends RuntimeException {
    /** serialVersionUID*/
	private static final long serialVersionUID = 1L;

	public PlatformException() {
        super();
    }


    public PlatformException(String message) {
        super(message);
    }

    public PlatformException(String message, Throwable e){
        super(message,e);
    }
}
